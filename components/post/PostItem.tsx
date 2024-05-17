import { Button, Dimensions, RefreshControl, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { Text, FlatList, TextInput, View, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { ListRenderItem } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import AntIcon from 'react-native-vector-icons/AntDesign';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Modal from "react-native-modal"
import User from '../User';
import { API } from '../../actions/userAction';
import { URL } from '../../constants/userConstants';

export interface Post {
    _id: string;
    id: string;
    title: string;
    imgUrl: any;
    user: any;
    commenter: any;
    likes: any;
    comments: any;
    postedBy: Object;
}

const { height } = Dimensions.get("window");

const PostItem = ({ data, date, navigation, handleLike, submitComment }: { data: Post, date: any, navigation: any, handleLike: any, submitComment: any }) => {
    const [open, setOpen] = useState<any>(false)
    const [comment, setComment] = useState<any>();
    const openPopup = () => {
        navigation.navigate('Detail', { matchId: data.id })
    }
    console.log(open, 'user')
    return (
        <TouchableOpacity>
            <View style={styles.post}>
                <View style={styles.postTop}>
                    <User user={data?.postedBy} />
                    <MaterialIcon name="more-horiz" color='#9133f0' size={14} />
                </View>
                <View>
                    <Image source={{ uri: data?.imgUrl }} style={{ width: '100%', height: 300 }} />
                </View>
                <View style={styles.inputActions}>
                    <TouchableOpacity style={styles.icon} onPress={() => handleLike(data?._id)}>
                        <AntIcon name="hearto" color="#000" size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon} onPress={() => setOpen(!open)}>
                        <EvilIcon name="comment" color="#000" size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon}>
                        <FeatherIcon name="navigation" color="#000" size={20} />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.likes}>
                        <Text>Liked by {data?.likes?.length}</Text>
                    </TouchableOpacity>
                    {data?.comments?.length > 0 && <TouchableOpacity onPress={() => setOpen(!open)} style={styles.comments}>
                        <Text style={styles.commentHeader}>view all {data?.comments?.length} comments</Text>
                    </TouchableOpacity>}
                </View>
            </View>
            <Modal
                isVisible={open}
                onBackdropPress={() => setOpen(false)}
                // Android back press // Swipe to discard
                //animationIn="slideOutUp" // Has others, we want slide in from the left
                //animationOut="slideOutDown" // When discarding the drawer
                swipeDirection="down" // Discard the drawer with swipe to left
                useNativeDriver // Faster animation
                hideModalContentWhileAnimating // Better performance, try with/without
                propagateSwipe // Allows swipe events to propagate to children components (eg a ScrollView inside a modal) // Needs to contain the width, 75% of screen width in our case
                style={styles.sideMenuStyle}
            >
                <ScrollView style={styles.allComments}>
                    <Text style={styles.title}>comments</Text>
                    {data?.comments?.map((comment: any) =>
                        <View style={styles.comment}>
                            <View>
                                <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/dreamelevenclone.appspot.com/o/images%2F13866.png?alt=media&token=4644f151-3dfd-4883-9398-4191bed34854' }} style={{ width: 40, height: 40, borderRadius: 50, marginRight: 15 }} />
                            </View>
                            <View>
                                <Text>{comment?.commentBy.username}</Text>
                                <Text>{comment?.commentText}</Text>
                            </View>
                        </View>)}
                </ScrollView>
                <View style={styles.comment}>
                    <View>
                        <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/dreamelevenclone.appspot.com/o/images%2F13866.png?alt=media&token=4644f151-3dfd-4883-9398-4191bed34854' }} style={{ width: 40, height: 40, borderRadius: 50, marginRight: 15 }} />
                    </View>
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(text) =>
                            setComment(text)
                        }
                        placeholder="Enter Comment" //12345
                        placeholderTextColor="#8b9cb5"
                        keyboardType="default"
                        blurOnSubmit={false}
                        secureTextEntry={false}
                        underlineColorAndroid="#f000"
                        returnKeyType="next"
                    />
                    <Button title="Submit" onPress={() => submitComment(data?._id, comment, setComment)} color="#4c9452" />
                </View>
                {/*<Button title="close" onPress={() => setOpen(false)} />*/}
            </Modal>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    title: {
        textAlign: 'center'
    },
    postTop: {
        height: 40,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        flexDirection: 'row'
    },
    post: {
        marginHorizontal: 15,
        marginVertical: 20,
        height: 'auto',
        backgroundColor: 'white',
        overflow: "hidden"
    },
    inputActions: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start',
        color: 'white',
        flexDirection: 'row'
    },
    actions: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        flexDirection: 'row'
    },
    inputStyle: {
        width: 250
    },
    icon: {
        marginRight: 10,
        marginVertical: 7
    },
    likes: {
        marginBottom: 4
    },
    comments: {
        marginBottom: 7
    },
    allComments: {
        height: '100%',
        backgroundColor: '#FFF',
        overflow: 'scroll',
        borderTopEndRadius: 10
    },
    commentHeader: {
        color: '#65676b'
    },
    comment: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginBottom: 8,
        backgroundColor: '#FFF'
    },
    sideMenuStyle: {
        margin: 0,
        height: height * 0.75,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        overflow: 'scroll'
    }
})
export default PostItem;