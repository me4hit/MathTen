import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MathView, { MathText } from 'react-native-math-view';

const CardComponet = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}></View>
            <View style={styles.content}>
                <MathText
                    value={`This text includes math notations and should be wrapped correctly for \\( \\alpha \\) and $\\beta$ within the view. \nThe following formula shouldn't be inline:$$x_{1,2} = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}$$However the following formula should be inline with the text: \\( a^2 + b^2 = c^2 \\)`}
                    direction="ltr"
                    CellRendererComponent={<TouchableOpacity />}
                />
            </View>
        </View>
    )
}

export default CardComponet

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
