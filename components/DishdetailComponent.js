import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';
import { postComment } from '../redux/ActionCreators';


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
  }
}

const mapDispatchToProps = dispatch => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))

})




function RenderDish(props) {

    const dish = props.dish;
    
        if (dish != null) {
            return(
              <Card
                  featuredTitle={dish.name}
                  image={{uri: baseUrl + dish.image}}>
                      <Text style={{margin: 10}}>
                          {dish.description}
                      </Text>
                      <View style={styles.iconContainer}>
                        <Icon
                            col-sm-6
                            raised
                            reverse
                            name={ props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                            />
                        <Icon
                          col-sm-6
                          raised
                          reverse
                          name={ 'pencil'}
                          type='font-awesome'
                          color='#512DA8'
                          onPress={() => props.toggleModal()}
                          />
                      </View>
                      
              </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComments(props) {

  const comments = props.comments;
          
  const renderCommentItem = ({item, index}) => {
      
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        {/* <Text style={{ fontSize: 12 }}>{} Stars</Text> */}
        <Rating
          imageSize={15}
          readonly
          startingValue={item.rating}
          style={{ alignItems: "flex-start" }}
        />
        <Text style={{ fontSize: 12 }}>
          {"-- " + item.author + ", " + item.date}{" "}
        </Text>
      </View>
    );
  };
  
  return (
      <Card title='Comments' >
      <FlatList 
          data={comments}
          renderItem={renderCommentItem}
          keyExtractor={item => item.id.toString()}
          />
      </Card>
  );
}

class Dishdetail extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      author: '',
      comment: '',
      rating: 0,
      showModal: false 
    }
  }

  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }

  static navigationOptions = {
      title: 'Dish Details'
  };

  toggleModal() {
    this.setState({showModal: !this.state.showModal});
  }

  handleComment(dishId, rating, author, comment) {
      console.log(JSON.stringify(this.state));
      this.props.postComment(dishId, rating, author, comment);
      this.toggleModal();
  }

  resetForm() {
      this.setState({
          author: '',
          comment: '',
          rating: 0,
          showModal: false 
      });
  }


  render() {
      const dishId = this.props.navigation.getParam('dishId','');
      return(
        <ScrollView>
            <RenderDish dish={this.props.dishes.dishes[+dishId]}
                favorite={this.props.favorites.some(el => el === dishId)}
                onPress={() => this.markFavorite(dishId)}
                toggleModal={() => this.toggleModal()}
                />
            <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
            <Modal animationType = {"slide"} transparent = {false}
                visible = {this.state.showModal}
               >
                <View style = {styles.modal}>
                                <View style={styles.formRow}>
                                    <Rating 
                                    showRating fractions="{1}" 
                                    startingValue={0}
                                    onFinishRating={(itemValue) => this.setState({rating: itemValue})} />
                                </View>
                                <View style={styles.formRow}>
                                    <Input
                                      placeholder=' Author'
                                      leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                                      onChangeText={(value) => this.setState({author: value})}
                                    />
                                </View>
                                <View style={styles.formRow}>
                                    <Input
                                      placeholder=' Comment'
                                      leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                                      onChangeText={(value) => this.setState({comment: value})}
                                    />
                                </View>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => this.handleComment(dishId, this.state.rating, this.state.author, this.state.comment)}                                    >
                                    <Text style={styles.formLabel} > Submit </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                        style={styles.button1}
                                        onPress = {() =>{this.resetForm();}}
                                    >
                                        <Text style={styles.formLabel} > Close </Text>
                                </TouchableOpacity>
                                
                                    
                </View>
            </Modal>
        </ScrollView>
      );
  }
}

const styles = StyleSheet.create({
  formRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 20
  },
 
  formItem: {
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  modal: {
    justifyContent: 'center',
    margin: 20
  },
  modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      backgroundColor: '#512DA8',
      textAlign: 'center',
      color: 'white',
      marginBottom: 20
  },
  modalText: {
      fontSize: 18,
      margin: 10
  },
  container: {
    flex: 1
 },button: {
  alignItems: 'center',
  backgroundColor: '#512DA8',
  padding: 10,
  color:'white',
  margin:20
},
button1: {
  alignItems: 'center',
  backgroundColor: 'gray',
  padding: 10,
  color:'white',
  margin:20
},
formLabel: {
  fontSize: 18,
  color:'white'
}
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);