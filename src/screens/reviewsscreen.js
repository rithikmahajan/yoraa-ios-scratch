import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Colors, Spacing, FontSizes, FontWeights, BorderRadius } from '../constants';

// SVG Icons
const BackIcon = ({ color = '#000000' }) => (
  <Svg width={10} height={17} viewBox="0 0 10 17" fill="none">
    <Path
      d="M8.5 16L1 8.5L8.5 1"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const StarIcon = ({ filled = false, color = '#FFD700' }) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Path
      d="M8 1L10.09 5.26L15 6L11.5 9.74L12.18 15L8 12.77L3.82 15L4.5 9.74L1 6L5.91 5.26L8 1Z"
      fill={filled ? color : 'none'}
      stroke={color}
      strokeWidth="1"
      strokeLinejoin="round"
    />
  </Svg>
);

const ReviewsScreen = ({ navigation, route }) => {
  const { product } = route?.params || {};
  const [newRating, setNewRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const handleBackPress = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  const handleStarPress = (rating) => {
    setNewRating(rating);
  };

  const submitReview = () => {
    // Handle review submission
    console.log('Review submitted:', { rating: newRating, text: reviewText });
    // Navigate back after submission
    handleBackPress();
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
        <BackIcon color="#000000" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Reviews</Text>
      <View style={styles.placeholder} />
    </View>
  );

  const renderWriteReview = () => (
    <View style={styles.writeReviewContainer}>
      <Text style={styles.writeReviewTitle}>Write a Review</Text>
      
      <View style={styles.ratingSelector}>
        <Text style={styles.ratingLabel}>Rating</Text>
        <View style={styles.starSelector}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => handleStarPress(star)}
              style={styles.starButton}
            >
              <StarIcon
                filled={star <= newRating}
                color={star <= newRating ? '#FFD700' : '#E0E0E0'}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.reviewInput}>
        <Text style={styles.inputLabel}>Your Review</Text>
        <TextInput
          style={styles.textInput}
          multiline
          numberOfLines={4}
          placeholder="Share your thoughts about this product..."
          value={reviewText}
          onChangeText={setReviewText}
          textAlignVertical="top"
        />
      </View>

      <TouchableOpacity 
        style={[styles.submitButton, (!newRating || !reviewText.trim()) && styles.disabledButton]}
        onPress={submitReview}
        disabled={!newRating || !reviewText.trim()}
      >
        <Text style={[styles.submitText, (!newRating || !reviewText.trim()) && styles.disabledText]}>
          Submit Review
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderExistingReviews = () => (
    <View style={styles.existingReviews}>
      <Text style={styles.sectionTitle}>Customer Reviews</Text>
      
      {product?.reviews?.map((review) => (
        <View key={review.id} style={styles.reviewItem}>
          <View style={styles.reviewHeader}>
            <Text style={styles.reviewUser}>{review.user}</Text>
            <Text style={styles.reviewDate}>{review.date}</Text>
          </View>
          <View style={styles.reviewStars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                filled={star <= review.rating}
                color="#FFD700"
              />
            ))}
          </View>
          <Text style={styles.reviewComment}>{review.comment}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderWriteReview()}
        {renderExistingReviews()}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    paddingTop: 50,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  backButton: {
    padding: Spacing.sm,
  },
  headerTitle: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.semiBold,
    color: Colors.textPrimary,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  writeReviewContainer: {
    padding: Spacing.lg,
    backgroundColor: Colors.backgroundSecondary,
    margin: Spacing.lg,
    borderRadius: BorderRadius.lg,
  },
  writeReviewTitle: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semiBold,
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
  },
  ratingSelector: {
    marginBottom: Spacing.lg,
  },
  ratingLabel: {
    fontSize: FontSizes.md,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  starSelector: {
    flexDirection: 'row',
  },
  starButton: {
    marginRight: Spacing.sm,
    padding: Spacing.xs,
  },
  reviewInput: {
    marginBottom: Spacing.lg,
  },
  inputLabel: {
    fontSize: FontSizes.md,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  textInput: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    fontSize: FontSizes.md,
    color: Colors.textPrimary,
    minHeight: 100,
  },
  submitButton: {
    backgroundColor: Colors.textPrimary,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: Colors.borderLight,
  },
  submitText: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semiBold,
    color: Colors.background,
  },
  disabledText: {
    color: Colors.textTertiary,
  },
  existingReviews: {
    padding: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semiBold,
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
  },
  reviewItem: {
    marginBottom: Spacing.lg,
    paddingBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  reviewUser: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semiBold,
    color: Colors.textPrimary,
  },
  reviewDate: {
    fontSize: FontSizes.sm,
    color: Colors.textTertiary,
  },
  reviewStars: {
    flexDirection: 'row',
    marginBottom: Spacing.sm,
  },
  reviewComment: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 50,
  },
});

export default ReviewsScreen;
