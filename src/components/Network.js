import React, { useCallback, useEffect } from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './NetworkStyle';
import Modal from 'react-native-modal';
import { useSelector, useDispatch } from 'react-redux';
import { GetStatusOff, GetStatusOn } from '../redux/actions/StatusNetwork';
import NetInfo from "@react-native-community/netinfo";



const NetworkModal = () => {
    const dispatch = useDispatch()
    const { isOffline, loading } = useSelector(state => state.statusnetwork)

    const checkStatus = useCallback(() => {
        dispatch(GetStatusOn())
    }, [dispatch])

    useEffect(() => {
        const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
            const offline = !(state.isConnected && state.isInternetReachable);
            dispatch(GetStatusOn(offline))
        })
        return () => removeNetInfoSubscription();
    }, [dispatch])



    const Button = ({ children, ...props }) => (
        <TouchableOpacity style={styles.button} {...props}>
            <Text style={styles.buttonText}>{children}</Text>
        </TouchableOpacity>
    );
    return (
        <Modal isVisible={isOffline} style={styles.modal} animationInTiming={600}>
            <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Connection Error</Text>
                <Text style={styles.modalText}>
                    Oops! Looks like your device is not connected to the Internet.
                </Text>
                <Button onPress={checkStatus} disabled={loading}>
                    Try Again
                </Button>
            </View>
        </Modal>
    )
}

export default NetworkModal