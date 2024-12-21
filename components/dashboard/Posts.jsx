import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
 import React, { useState } from 'react';
 import Ionicons from 'react-native-vector-icons/Ionicons';
 import FontAwesome from 'react-native-vector-icons/FontAwesome'; 
 import moment from 'moment';
 
 const postData = [
   {
     id: 1,
     name: 'Madhusudhan Rao',
     imageUrl: 'https://via.placeholder.com/50',
     postImage: {
       imageUrl: 'https://via.placeholder.com/150',
       caption: 'This is a post captionThis is a post captionThis is a post caption',
     },
   },
   {
     id: 2,
     name: 'John Doe',
     imageUrl: 'https://via.placeholder.com/50',
     postImage: {
       imageUrl: 'https://via.placeholder.com/150',
       caption: 'This is another post caption',
     },
   },
   {
     id: 3,
     name: 'Jane Doe',
     imageUrl: 'https://via.placeholder.com/50',
     postImage: {
       imageUrl: 'https://via.placeholder.com/150',
       caption: 'Yet another post caption',
     },
   },
 ];
 
 export default function Posts() {
   const [expandedPostIds, setExpandedPostIds] = useState([]);
   const [selectedPostId, setSelectedPostId] = useState(null);
   const [commentText, setCommentText] = useState('');
   const [comments, setComments] = useState({}); 
 
   const toggleCaption = (postId) => {
     setExpandedPostIds((prev) =>
       prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
     );
   };
 
   const truncateCaption = (caption, isExpanded) => {
     if (isExpanded || caption.length <= 25) return caption;
     return `${caption.slice(0, 25)}...`;
   };
 
   const [toggleSave, setToggleSave] = useState({});
   const [toggleLikePost, setTogglePostLike] = useState({});
 
   const saveToggleFunction = (postId) => {
     setToggleSave((prev) => ({
       ...prev,
       [postId]: !prev[postId],
     }));
   };
 
   const toggleLikeFunction = (postId) => {
     setTogglePostLike((prev) => ({
       ...prev,
       [postId]: !prev[postId],
     }));
   };
 
   const [commentClick, setCommentClick] = useState(false)
 
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
     setCommentClick(true);
   };
 
   const handleCloseModal = () => {
     setCommentClick(false);
     setCommentText('');
   };
 
   const handleCommentSubmit = () => {
     if (commentText.trim() === '') return;
 
     const newComment = {
       text: commentText,
       time: new Date(), // Record the current time
     };
 
     setComments((prev) => ({
       ...prev,
       [selectedPostId]: [...(prev[selectedPostId] || []), newComment],
     }));
     setCommentText('');
   };
 
 
 
   return (
     <ScrollView style={styles.container}>
       {postData.map((data) => {
         const isExpanded = expandedPostIds.includes(data.id);
         const isSaved = toggleSave[data.id];
         const isLikePost = toggleLikePost[data.id];
         return (
           <View key={data.id} style={styles.postContainer}>
             <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
               <View style={styles.userInfo}>
                 <Image source={{ uri: data.imageUrl }} style={styles.userImage} />
                 <Text style={styles.userName}>{data.name}</Text>
               </View>
             </View>
 
             <View style={styles.postContent}>
             <TouchableOpacity onPress={() => openPhotoModal(data)}>
   <Image source={{ uri: data.postImage.imageUrl }} style={styles.postImage} />
 </TouchableOpacity>
               <View style={{display:'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, paddingTop:2,}}>
               <View style={styles.iconRow}>
                 <TouchableOpacity onPress={() => toggleLikeFunction(data.id)}>
                   <FontAwesome
                     name={isLikePost ? 'heart' : 'heart-o'} // Filled heart when liked
                     size={24}
                     color={isLikePost ? 'red' : 'black'} // Red when liked, black when not liked
                     style={{
                       backgroundColor: 'transparent', // No background needed
                       padding: 6,
                       borderRadius: 50,
                     }}
                   />
                 </TouchableOpacity >
 
                 <TouchableOpacity onPress={() => handleCommentClick(data.id)}>
                   <Ionicons name="chatbubble-outline" size={24} color="black" />
                 </TouchableOpacity>
 
                 {/* {commentClick && <ModalForComment />} */}
 
                 <Ionicons name="share-social-outline" size={24} color="black" />
               </View>
               <View>
                 <TouchableOpacity onPress={() => saveToggleFunction(data.id)}>
                   <Ionicons
                     name={isSaved ? 'bookmark' : 'bookmark-outline'} 
                     size={24}
                     color={isSaved ? 'black' : ''}
                     style={{
                       // backgroundColor: isSaved ? 'black' : 'transparent', 
                       // padding: 6,
                       // borderRadius: 50,
                     }}
                   />
                 </TouchableOpacity>
               </View>
               </View>
               <View style={styles.captionContainer}>
                 <Text style={{ fontWeight: 'bold', fontSize: 14, marginRight: 4 }}>{data.name}</Text>
                 <Text style={styles.caption}>
                   {truncateCaption(data.postImage.caption, isExpanded)}
                 </Text>
                 {!isExpanded && data.postImage.caption.length > 25 && (
                   <TouchableOpacity onPress={() => toggleCaption(data.id)}>
                     <Text style={styles.moreText}>more</Text>
                   </TouchableOpacity>
                 )}
                 {isExpanded && (
                   <TouchableOpacity onPress={() => toggleCaption(data.id)}>
                     <Text style={styles.moreText}>less</Text>
                   </TouchableOpacity>
                 )}
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
      <View style={styles.commentContainer}>
      <View style={styles.commentHeader}>
        <Image
          style={styles.commentImage}
          source={{ uri: 'path/to/image' }} 
        />
        <Text style={styles.commenterName}>userName</Text>
      </View>
    
      {/* Updated Row for Comment and Icon */}
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
 
 
 
 
 <Modal visible={photoModalVisible} animationType="fade" transparent>
   <View style={styles.modalContainer}>
     <View style={styles.modalContentForImage}>
       {/* Close Button */}
       <TouchableOpacity onPress={closePhotoModal} style={styles.closeButtonForPostImage}>
         <Text style={styles.closeText}>✕</Text>
       </TouchableOpacity>
 
       {selectedPhotoPost && (
         <>
           {/* User Profile Section */}
           <View style={styles.profileSection}>
             <Image
               source={{ uri: selectedPhotoPost.imageUrl }}
               style={styles.profileImage}
             />
             <Text style={styles.profileName}>{selectedPhotoPost.name}</Text>
           </View>
 
           {/* Dynamic Image */}
           <Image
             source={{ uri: selectedPhotoPost.postImage.imageUrl }}
             style={styles.dynamicImage}
             resizeMode="contain"
           />
 
           {/* Icon Row */}
           <View style={styles.iconRowModal}>
             <TouchableOpacity onPress={() => toggleLikeFunction(selectedPhotoPost.id)}>
               <FontAwesome
                 name={toggleLikePost[selectedPhotoPost.id] ? 'heart' : 'heart-o'}
                 size={24}
                 color={toggleLikePost[selectedPhotoPost.id] ? 'red' : 'black'}
               />
             </TouchableOpacity>
             <TouchableOpacity onPress={() => handleCommentClick(selectedPhotoPost.id)}>
               <Ionicons name="chatbubble-outline" size={24} color="black" />
             </TouchableOpacity>
             <Ionicons name="share-social-outline" size={24} color="black" />
             <TouchableOpacity onPress={() => saveToggleFunction(selectedPhotoPost.id)}>
               <Ionicons
                 name={toggleSave[selectedPhotoPost.id] ? 'bookmark' : 'bookmark-outline'}
                 size={24}
                 color={toggleSave[selectedPhotoPost.id] ? 'black' : ''}
               />
             </TouchableOpacity>
           </View>
 
           {/* Caption */}
           <Text style={styles.captionForModalImage}>{selectedPhotoPost.postImage.caption}</Text>
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
    aspectRatio: 1, // Maintains original image aspect ratio
    // borderRadius: 10,
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
  // caption: {
  //   paddingHorizontal: 16,
  //   paddingTop: 12,
  //   color: '#333',
  //   fontSize: 14,
  // },


  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
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
    // maxHeight: 150,

  },

  commentContainer: {
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  commentHeader: {
    flexDirection: 'row',
    // justifyContent: 'start', // Evenly distributes the icons horizontally
    alignItems: 'center',
    //  gap: 15,
    // marginBottom: 5,
  },

  commentTextContainer: {
    flexDirection: 'row', // Ensure items are in a row
    alignItems: 'center', // Vertically align text and icon
    justifyContent: 'space-between', // Optional: To space out the text and icon if needed
    marginVertical: 5,
    marginLeft: 40,
    // paddingHorizontal: 6 // Space between the comment and other elements
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
    // padding: 10,
  },
iconRow: {
  flexDirection: 'row',
  justifyContent: 'start', // Evenly distributes the icons horizontally
  alignItems: 'center',
   gap: 15,
},

container: {
  // padding: 10,
},
postContainer: {
  marginBottom: 10,
  // padding: 10,
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
  height: 200,
  borderRadius: 5,
  marginBottom: 5,
},
captionContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  flexWrap: 'wrap',
  paddingHorizontal: 10, 
  // paddingTop:2,
},
caption: {
  fontSize: 13,
  color: '#555',
  marginRight: 5,
  // paddingHorizontal: 15,
  // paddingTop: 7,
},
captionForModalImage:{
  fontSize: 13,
  color: '#555',
  marginRight: 5,
  paddingHorizontal: 15,
  paddingTop: 7,
},
moreText: {
  fontSize: 12,
  color: '#007BFF',
   },  
 });
