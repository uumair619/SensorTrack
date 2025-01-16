package com.sensor.tracker

import android.app.*
import android.content.Context
import android.content.Intent
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.location.Location
import android.os.Build
import android.os.IBinder
import androidx.core.app.NotificationCompat
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.google.android.gms.location.*
import java.util.concurrent.TimeUnit


class LocationService : Service(), SensorEventListener {

    private lateinit var fusedLocationClient: FusedLocationProviderClient
    private lateinit var sensorManager: SensorManager
    private var lightSensor: Sensor? = null

    private var stationaryTime: Long = 0
    private var walkingTime: Long = 0
    private var runningTime: Long = 0
    private var lightValue : Float= 0.0f
    private var activityState: String = "Stationary"
    private var lastUpdateTime: Long = System.currentTimeMillis()

    override fun onCreate() {
        super.onCreate()

        // Initialize location client
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)

        // Initialize sensors
        sensorManager = getSystemService(Context.SENSOR_SERVICE) as SensorManager
        lightSensor = sensorManager.getDefaultSensor(Sensor.TYPE_LIGHT)

        // Start location updates
        startLocationUpdates()

        // Start foreground notification
        startForegroundService()
    }

    private fun startLocationUpdates() {
        val locationRequest = LocationRequest.Builder(Priority.PRIORITY_HIGH_ACCURACY, 5000).build()

        fusedLocationClient.requestLocationUpdates(locationRequest, object : LocationCallback() {
            override fun onLocationResult(locationResult: LocationResult) {
                val location: Location? = locationResult.lastLocation
                updateNotification(location!!)
                calculateActivity(location!!)
            }
        }, mainLooper)
    }

    private fun calculateActivity(location: Location) {
        // Example calculation (use real accelerometer data for better accuracy)
        val speed = location.speed // in meters/second
        val currentTime = System.currentTimeMillis()

        when {
            speed < 0.3 -> {
                activityState = "Stationary"
                stationaryTime += currentTime - lastUpdateTime
            }
            speed < 2 -> {
                activityState = "Walking"
                walkingTime += currentTime - lastUpdateTime
            }
            else -> {
                activityState = "Running"
                runningTime += currentTime - lastUpdateTime
            }
        }
        LocationServiceModule.sendDataToReact(location.latitude.toString(), location.longitude.toString(), lightValue.toString(), activityState.toString(), stationaryTime.toString())
        lastUpdateTime = currentTime
    }

    private fun updateNotification(location: Location) {
        val notification = NotificationCompat.Builder(this, "location_channel")
            .setContentTitle("Tracking Location")
            .setContentText(
                "Lat: ${location.latitude}, Lng: ${location.longitude}\n" +
                        "Activity: $activityState\n" +
                        "Stationary: ${formatTime(stationaryTime)}, Walking: ${formatTime(walkingTime)}, Running: ${formatTime(runningTime)}"
            )
            .setSmallIcon(R.drawable.noti)
            .build()

        val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        notificationManager.notify(1, notification)
    }

    private fun formatTime(timeMillis: Long): String {
        val hours = TimeUnit.MILLISECONDS.toHours(timeMillis)
        val minutes = TimeUnit.MILLISECONDS.toMinutes(timeMillis) % 60
        val seconds = TimeUnit.MILLISECONDS.toSeconds(timeMillis) % 60
        return "$hours:$minutes:$seconds"
    }

    private fun startForegroundService() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                "location_channel",
                "Location Tracking",
                NotificationManager.IMPORTANCE_LOW
            )
            val manager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            manager.createNotificationChannel(channel)
        }

        val notification = NotificationCompat.Builder(this, "location_channel")
            .setContentTitle("Tracking Location")
            .setContentText("Service is running...")
            .setSmallIcon(R.drawable.noti)
            .build()

        startForeground(1, notification)
    }

    override fun onSensorChanged(event: SensorEvent?) {
        if (event?.sensor?.type == Sensor.TYPE_LIGHT) {
            lightValue = event.values[0]
            // Send light value to notification or React Native
        }
    }

    override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {}

    override fun onBind(intent: Intent?): IBinder? {
        return null
    }

    override fun onDestroy() {
        super.onDestroy()
        fusedLocationClient.removeLocationUpdates(object : LocationCallback() {})
        sensorManager.unregisterListener(this)
    }
}