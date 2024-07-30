import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
const STYLES = StyleSheet.create({
    bg: {
        flex:1,
        // height:800,
        backgroundColor: '#FACA4E'
    },
    mainv: {
        flex: 1,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        marginTop: '15%',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    ti: {
        marginHorizontal: '7%',
        marginTop: '5%',
        width: 300,
        backgroundColor: 'white',
        fontSize: wp(4),
        paddingLeft: '2%',
        borderRadius: 10,
    },
    v1: {
        marginTop: '10%'
    },
    hs: {
        position: 'absolute',
        borderWidth: 1,
        borderRadius: 10,
        width: 60, height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        right: 35,
        top: 31
    },
    txt: {
     
        fontSize:wp(3.6),
        fontFamily: 'Inter-Medium'
    },
    selectCheckBox: {
        width: 17,
        height: 17,
        borderRadius: wp(1),
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#FACA4E',
      },
      unSelectCheckBox: {
        width: 17,
        height: 17,
        borderRadius: wp(1),
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#C4C4C4',
      },
})

export default STYLES; 