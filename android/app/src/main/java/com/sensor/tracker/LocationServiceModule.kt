package com.sensor.tracker
import android.content.Intent
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.sensor.tracker.LocationData

class LocationServiceModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val reactContext: ReactApplicationContext = reactContext

    override fun getName(): String {
        return "LocationServiceModule"
    }

    @ReactMethod
    fun startService() {
        val serviceIntent = Intent(reactContext, LocationService::class.java)
        reactContext.startForegroundService(serviceIntent)
    }

    @ReactMethod
    fun stopService() {
        val serviceIntent = Intent(reactContext, LocationService::class.java)
        reactContext.stopService(serviceIntent)
    }

    companion object {
        // Static method to send data to React Native
        lateinit var reactContext: ReactApplicationContext
        fun sendDataToReact(latitude: String, longitude: String, lightValue: String, activityState: String, duration: String) {
            val eventEmitter = reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)

            val locationData = LocationData(latitude, longitude, lightValue, activityState, duration)
            eventEmitter.emit("LocationServiceData", locationData.toJSON())
        }
    }
}
