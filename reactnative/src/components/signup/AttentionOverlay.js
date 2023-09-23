import React from 'react';
import { View, Text } from 'react-native';
import { Overlay } from 'react-native-elements';

const AttentionOverlay = () => {
    return (
        <View>
            <Overlay isVisible={visible} onBackdropPress={() => setVisible(false)} overlayStyle={styles.overlay}>
                <Text>Hello from Overlay!</Text>
            </Overlay>
        </View>
    );
}

export default AttentionOverlay;