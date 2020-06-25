import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card } from 'react-native-elements';


// function RenderItem(props) {
    
//   const item = props.item;
  
//   if (item != null) {
//       return(
//           <Card
//               featuredTitle={item.name}
//               featuredSubtitle={item.designation}
//               image={require('./images/uthappizza.png')}>
//               <Text
//                   style={{margin: 10}}>
//                   {item.description}</Text>
//           </Card>
//       );
//   }
//   else {
//       return(<View></View>);
//   }
// }

class Contact extends Component {

  // constructor(props) {
  //     super(props);
  //     this.state = {
  //       dishes: DISHES,
  //       promotions: PROMOTIONS,
  //       leaders: LEADERS
  //     };
  // }

  static navigationOptions = {
      title: '',
  };

  render() {
      
      return(
        <Card title="Contact Information">
            <Text>121, Clear Water Bay Road</Text>
            <Text>Clear Water Bay, Kowloon</Text> 
            <Text>HONG KONG</Text>  
            <Text>Tel: +852 1234 5678</Text>  
            <Text>Fax: +852 8765 4321</Text>  
            <Text>Email:confusion@food.net</Text>              
        </Card>
      );
  }
}

export default Contact;