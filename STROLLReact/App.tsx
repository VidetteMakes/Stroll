import { Accelerometer, AccelerometerMeasurement, Gyroscope, GyroscopeMeasurement } from "expo-sensors";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

//displays accelerometer + gyroscope data, updates every 0.1 sec
export default function Sensors() {
    const [accelData, setAccelData] = useState<AccelerometerMeasurement | null>(null);
    const [gyroData, setGyroData] = useState<GyroscopeMeasurement | null>(null);

    useEffect(() => {
        Accelerometer.setUpdateInterval(100);
        Gyroscope.setUpdateInterval(100);

        const accelSub = Accelerometer.addListener(data => {
            setAccelData(data);
        });

        const gyroSub = Gyroscope.addListener(data => {
            setGyroData(data);
        });

        //remove listeners on exit, don't want duplicates
        return () => {
            accelSub.remove();
            gyroSub.remove();
        };
    }, []);

    return (
        <View style = {styles.container}>
            <Text>Accelerometer:</Text>
            <Text>x: {accelData?.x?.toFixed(2)}</Text>
            <Text>y: {accelData?.y?.toFixed(2)}</Text>
            <Text>z: {accelData?.z?.toFixed(2)}</Text>

            <Text style={{marginTop: 20}}>Gyroscope: </Text>
            <Text>x: {gyroData?.x?.toFixed(2)}</Text>
            <Text>y: {gyroData?.y?.toFixed(2)}</Text>
            <Text>z: {gyroData?.z?.toFixed(2)}</Text>
        </View>
    )    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
