
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    page:{
  //just the div for each chat componet on tab1
    },
    container:{
      flexDirection: 'row', 
      // It will add all Elements in container div as columns, it has nothing to do with the class row
  
      padding:10,
    },
    rightContainer :{
      flex:1,
      // This means take the full width of the parent container 
      justifyContent:"center",
    },
    row:{
      flexDirection:'row',
      // This will keep name and date in a single line
      justifyContent:'space-between',
  
  
    },
    text:{
      color:'grey'
    },
    name :{
      fontWeight:"bold",
      fontSize:16,
      marginBottom:3,
    },
    image:{
      height:60,
      width:60,
     borderRadius:30,
     marginRight:10,
    },
    badgeContainer :{
      backgroundColor:'#3872E9',
      width:20,
      height:20,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10, //helf of width and height
      borderWidth:1,
      borderColor:'white' ,
      position:'absolute', //brings at the left most corner of parent view or parent div
      left:45,
      top:10,
      },
    badgeText:{
      color:'white',
    }
  });
  export default styles;
  