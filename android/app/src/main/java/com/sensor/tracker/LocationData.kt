package com.sensor.tracker

import org.json.JSONObject
data class LocationData(
    val latitude: String,
    val longitude: String,
    val lightValue: String,
    val activityState: String,
    val duration: String
) {
    // Method to convert to JSON string
    fun toJSON(): String {
        val jsonObject = JSONObject()
        jsonObject.put("latitude", latitude)
        jsonObject.put("longitude", longitude)
        jsonObject.put("lightValue", lightValue)
        jsonObject.put("activityState", activityState)
        jsonObject.put("duration", duration)
        return jsonObject.toString()
    }
}
