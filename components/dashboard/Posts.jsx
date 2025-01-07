import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Modal, TextInput, ActivityIndicator, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; 
import moment from 'moment';
import { useSelector } from 'react-redux';
import getToken from '../GetToken';
import {BASE_URL} from '@env'

export default function Posts() {
  const [expandedPostIds, setExpandedPostIds] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState({}); 
  const [likeCounts, setLikeCounts] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);
  const [commentss, setCommentss] = useState(false);

  const toggleCaption = (postId) => {
    setExpandedPostIds((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
    );
  };

  const truncateCaption = (caption, postId) => {
    const isExpanded = expandedPostIds.includes(postId);
    if (isExpanded || caption?.length <= 25) return caption;
    return `${caption?.slice(0, 25)}...`;
  };

  const [toggleSave, setToggleSave] = useState({});
  const [toggleLikePost, setToggleLikePost] = useState({});

  const toggleLikeFunction = (postId) => {
    setToggleLikePost((prevState) => {
      const isLiked = prevState[postId] || false; 
      setLikeCounts((prevCounts) => ({
        ...prevCounts,
        [postId]: isLiked ? (prevCounts[postId] || 0) - 1 : (prevCounts[postId] || 0) + 1, 
      }));

      return {
        ...prevState,
        [postId]: !isLiked, 
      };
    });
  };
const [tokenn, setTokenn] = useState('')
  useEffect(() => {
    const fetchToken = async () => {
      const userdataa = await getToken();
      setTokenn(userdataa)
    
    };

    fetchToken();
  }, []);
  // console.log('Token from useEffect in postname:', tokenn?.userData?.name);

  const [commentClick, setCommentClick] = useState(false);

  const [photoModalVisible, setPhotoModalVisible] = useState(false);
  const [selectedPhotoPost, setSelectedPhotoPost] = useState(null);
  
  const openPhotoModal = (post) => {
    setSelectedPhotoPost(post);
    setPhotoModalVisible(true);
  };
  
  const closePhotoModal = () => {
    setPhotoModalVisible(false);
    setSelectedPhotoPost(null);
  };

  const handleCommentClick = (postId) => {
    setSelectedPostId(postId);
    fetchComments(postId)
    setCommentClick(true);
  };



  const handleCloseModal = () => {
    setCommentClick(false);
    setCommentText('');
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) {
      return; 
    }
  
    try {
      const response = await fetch(`${BASE_URL}/comments/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenn.token}`, 
        },
        body: JSON.stringify({
          postId: selectedPostId,
          text: commentText,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        const newComment = {
          username: tokenn.userData.name, 
          text: commentText,
          createdAt: new Date().toISOString(), 
          _id: data.comment._id || new Date().getTime().toString(),
        };
  
        setCommentss((prev) => [
          ...prev,
          newComment,
        ]);
  
        setCommentText(''); 
      } else {
        console.error('Failed to submit comment:', data.message);
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };
  

  const [imageData, setImageData] = useState([]);
  const [loading, setLoading] = useState(true);  

  useEffect(() => {

    const fetchImages = async () => {
      try {
        const response = await fetch(`${BASE_URL}/images/getAll`);
        const data = await response.json();
        setImageData(data);  
        setLoading(false); 
      } catch (err) {
        console.log(err, 'error');  
        setLoading(false);  
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />; 
  }

  const fetchComments = async (selectedPostId) => {
    if (!selectedPostId) {
      console.error('No selected post ID provided.');
      return null;
    }

    try {
      console.log('Fetching comments for postId:', selectedPostId);
      const response = await fetch(`${BASE_URL}/comments/comments/${selectedPostId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${tokenn.token}`, 
        },
      });

      if (response.ok) {
        const data = await response.json();
        // console.log('Comments fetched successfully:', data.comments);
        setCommentss(data.comments);
      } else {
        const errorData = await response.json();
        console.error('Failed to fetch comments:', errorData.message);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

   return (
     <ScrollView style={styles.container}>
     {imageData?.map((item) => {
      const isLikePost = toggleLikePost[item._id] || false; 
      const likeCount = likeCounts[item._id] || 0; 
      const isSaved = toggleSave[item._id] || false; 
      const isExpanded = expandedPostIds.includes(item._id);

      return (
        <View key={item.id} style={styles.postContainer}>
             <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
               <View style={styles.userInfo}>
                 {/* <Image source={{ uri: data.imageUrl }} style={styles.userImage} /> */}
                 <Text style={styles.userName}>{item.uploadedBy?.name}</Text>
               </View>
             </View>

          <View style={styles.postContent}>
            <Pressable onPress={() => openPhotoModal(item)}>
            <Image
              source={{ uri: item.imageUrl }} 
              style={styles.postImage}        
            />
            </Pressable>
            <View className = 'flex flex-row justify-between mx-3'>
            <View style={styles.iconRow}>
              <TouchableOpacity onPress={() => toggleLikeFunction(item._id)}>
                <FontAwesome
                  name={isLikePost ? 'heart' : 'heart-o'}
                  size={24}
                  color={isLikePost ? 'red' : 'black'}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleCommentClick(item._id)}>
                <Ionicons name="chatbubble-outline" size={24} color="black" />
              </TouchableOpacity>
              <Ionicons name="share-social-outline" size={24} color="black" />
            </View>
            {/* <Text>{likeCount} Likes</Text> */}
            <View className='flex justify-end'>
                 <TouchableOpacity onPress={() => saveToggleFunction(item._id)} className='flex justify-end'>
                   <Ionicons
                     name={isSaved ? 'bookmark' : 'bookmark-outline'} 
                     size={24}
                     color={isSaved ? 'black' : ''}
                   />
                 </TouchableOpacity>
               </View>
               </View>
               <View className='flex flex-row mx-4 gap-3 items-start'>
                <Text>{item.uploadedBy?.name}</Text>
                <View>
              <Text style={styles.caption}>
                {truncateCaption(item.caption, item._id)} 
              </Text>
              {!isExpanded && item.caption?.length > 25 && (
                <TouchableOpacity onPress={() => toggleCaption(item._id)}>
                  <Text style={styles.moreText}>more</Text>
                </TouchableOpacity>
              )}
              {isExpanded && (
                <TouchableOpacity onPress={() => toggleCaption(item._id)}>
                  <Text style={styles.moreText}>less</Text>
                </TouchableOpacity>
              )}
              </View>
            </View>
             </View>
           </View>
      );
    })}
    
        <Modal visible={commentClick} animationType="slide" transparent>
         <View style={styles.modalContainer}>
           <View style={styles.modalContent}>
             <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
             <Text style={styles.closeText}>✕</Text>
           </TouchableOpacity>
             <Text style={styles.modalTitle}>Add a Comment</Text>
             <ScrollView style={styles.commentsList}>
   <View style={{ display: 'flex', flexDirection: 'column' }}>
   {comments[selectedPostId]?.map((comment, index) => (
  <View key={index} style={styles.commentContainer}>
    <View style={styles.commentHeader}>
      <Image
        style={styles.commentImage}
        source={{ uri: 'path/to/image' }} 
      />
      <Text style={styles.commenterName}>{comment.username}</Text> 
    </View>
    <View style={styles.commentTextContainer}>
      <Text>{comment.text}</Text>
      <Ionicons name="heart-outline" size={16} color="black" style={{ paddingVertical: 3 }} />
    </View>
    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', marginLeft: 40 }}>
      <Text style={{ fontSize: 12, color: '#555' }}>
        {moment(comment.time).fromNow()}
      </Text>
      <Text style={{ color: '#87CEEB', fontSize: 12 }}>Reply..</Text>
    </View>
  </View>
))}

   </View>
 </ScrollView>
             <View style={styles.commentInputContainer}>
               <TextInput
                 style={styles.commentInput}
                 placeholder="Write your comment..."
                 value={commentText}
                 onChangeText={setCommentText}
                 multiline 
               />
               <TouchableOpacity onPress={handleCommentSubmit}>
                 <Ionicons name="send" size={24} color="#007BFF" />
               </TouchableOpacity>
             </View>
 
           </View>
         </View>
       </Modal>


       <Modal visible={commentClick} animationType="slide" transparent>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>
      <Text style={styles.modalTitle}>Add a Comment</Text>

      <ScrollView style={styles.commentsList}>
        <View style={{ display: 'flex', flexDirection: 'column' }}>
          {console.log(commentss ,"comments[selectedPostId] comments[selectedPostId] ")}
          {commentss.length > 0 ? (
  commentss.map((comment, index) => (
    <View key={comment._id || index} style={styles.commentContainer}>
      <View style={styles.commentHeader}>
        <Image
          style={styles.commentImage}
          source={{ uri: 'path/to/image' }} 
        />
        <Text style={styles.commenterName}>{comment.username}</Text>
      </View>
      <View style={styles.commentTextContainer}>
        <Text>{comment.text}</Text>
        <Ionicons name="heart-outline" size={16} color="black" style={{ paddingVertical: 3 }} />
      </View>
      <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', marginLeft: 40 }}>
        <Text style={{ fontSize: 12, color: '#555' }}>
          {moment(comment.createdAt).fromNow()}
        </Text>
        <Text style={{ color: '#87CEEB', fontSize: 12 }}>Reply..</Text>
      </View>
    </View>
  ))
) : (
  <Text>No comments available.</Text>
)}

        </View>
      </ScrollView>

      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Write your comment..."
          value={commentText}
          onChangeText={setCommentText}
          multiline
        />
        <TouchableOpacity onPress={handleCommentSubmit}>
          <Ionicons name="send" size={24} color="#007BFF" />
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

  <Modal visible={photoModalVisible} animationType="fade" transparent>
   <View style={styles.modalContainer}>
     <View style={styles.modalContentForImage}>

       <TouchableOpacity onPress={closePhotoModal} style={styles.closeButtonForPostImage}>
         <Text style={styles.closeText}>✕</Text>
       </TouchableOpacity>
 
       {selectedPhotoPost && (
         <>
           <View style={styles.profileSection}>
             {/* <Image
               source={{ uri: selectedPhotoPost.imageUrl }}
               style={styles.profileImage}
             /> */}
             <Text style={styles.profileName} className='my-3'>{selectedPhotoPost?.uploadedBy?.name}</Text>
           </View>
 
           {/* Dynamic Image */}
           {/* <Image
             source={{ uri: selectedPhotoPost.postImage.imageUrl }}
             style={styles.dynamicImage}
             resizeMode="contain"
           /> */}
           <Image
              source={{uri: selectedPhotoPost.imageUrl}} 
              style={styles.postImage}        
            />

           <View style={styles.iconRowModal}>
             <TouchableOpacity onPress={() => toggleLikeFunction(selectedPhotoPost._id)}>
               <FontAwesome
                 name={toggleLikePost[selectedPhotoPost._id] ? 'heart' : 'heart-o'}
                 size={24}
                 color={toggleLikePost[selectedPhotoPost._id] ? 'red' : 'black'}
               />
             </TouchableOpacity>
             <TouchableOpacity onPress={() => handleCommentClick(selectedPhotoPost._id)}>
               <Ionicons name="chatbubble-outline" size={24} color="black" />
             </TouchableOpacity>
             <Ionicons name="share-social-outline" size={24} color="black" />
             <TouchableOpacity onPress={() => saveToggleFunction(selectedPhotoPost._id)}>
               <Ionicons
                 name={toggleSave[selectedPhotoPost._id] ? 'bookmark' : 'bookmark-outline'}
                 size={24}
                 color={toggleSave[selectedPhotoPost._id] ? 'black' : ''}
               />
             </TouchableOpacity>
           </View>
           <View style={styles.captionForModalImage} className='flex flex-row gap-5 items-center mx-7 mt-3'>
            <Text className='text-md font-bold '>Caption</Text>
            <Text className= 'text-sm'>
            {selectedPhotoPost.caption}
            </Text>
            </View>
         </>
       )}
     </View>
   </View>
 </Modal> 
     </ScrollView>
   );
 }

const styles = StyleSheet.create({
  modalContentForImage: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    height:'100%',
    paddingBottom: 20,
    marginTop: 35,
  },
  closeButtonForPostImage: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  closeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  dynamicImage: {
    width: '100%',
    height: undefined, // Ensures height is dynamic
    aspectRatio: 1, 
    marginTop: 16,
  },
  iconRowModal: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap:30,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingTop: 15,
  },
  modalContent: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    // alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign:'center'
  },
  commentInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    textAlignVertical: 'bottom',
  },
  commentsList: {
    width: '100%',
    height: '100%',
    marginTop: 10,
  },
  commentContainer: {
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentTextContainer: {
    flexDirection: 'row', // Ensure items are in a row
    alignItems: 'center', // Vertically align text and icon
    justifyContent: 'space-between', // Optional: To space out the text and icon if needed
    marginVertical: 5,
    marginLeft: 40,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%',
  },
  commentInput: {
    flex: 1,
    paddingVertical: 10,
  },
  commentImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'gray',
  },
  commenterName: {
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 10,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
iconRow: {
  flexDirection: 'row',
  justifyContent: 'start', // Evenly distributes the icons horizontally
  alignItems: 'center',
   gap: 15,
},
postContainer: {
  marginBottom: 10,
  borderRadius: 5,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.8,
  shadowRadius: 2,
},
userInfo: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 10,
  paddingHorizontal: 10,
  paddingTop: 4,
},
userImage: {
  width: 50,
  height: 50,
  borderRadius: 25,
  marginRight: 10,
},
userName: {
  fontWeight: 'bold',
},
postContent: {
  marginBottom: 10,
},
postImage: {
  width: '100%',
  height: undefined,      // Allow height to adjust naturally based on aspect ratio
  borderRadius: 5,        // Keep rounded corners
  marginBottom: 5,        // Add spacing below the image
  aspectRatio: 1,
},
captionContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  flexWrap: 'wrap',
  paddingHorizontal: 10,
},
caption: {
  fontSize: 13,
  color: '#555',
  marginRight: 5,
},
moreText: {
  fontSize: 12,
  color: '#007BFF',
   },  
 });