import { StyleSheet } from 'react-native'

export const commonStyle = StyleSheet.create({
    textBlack: { color: '#14142B' },
    textSecondary: { color: '#8692A6' },
    textPrimary: { color: '#5F2EEA' },
    textWhite: { color: '#fff' },
    textCenter: { textAlign: 'center' },
    flexRow: { flexDirection: 'row' },
    flexColumn: { flexDirection: 'column' },
    flexCenter: { justifyContent: 'center', alignItems: 'center' },
    flexBetween: { justifyContent: 'space-between' },
    header: { paddingVertical: 15, paddingHorizontal: 13, backgroundColor: '#fff' },
    container: { paddingHorizontal: 13 },
    button: { backgroundColor: '#5F2EEA', height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
    buttonSecondary: { borderColor: '#5F2EEA', borderWidth: 2, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
    inputArea: { borderColor: '#DEDEDE', borderRadius: 5, borderWidth: 2, padding: 5 }
})