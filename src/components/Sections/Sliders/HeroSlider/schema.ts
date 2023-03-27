import { gql } from '@apollo/client';

const FollowMutation = gql`
  mutation follow($token: String!, $target: String!) {
    follow(input: { target: $target, token: $token }) {
      succeeded
      message
    }
  }
`;
const unFollowMutation = gql`
  mutation follow($token: String!, $target: String!) {
    unFollow(input: { target: $target, token: $token }) {
      succeeded
      message
    }
  }
`;
const likeMutation = gql`
  mutation follow($token: String!, $target: String!) {
    likeSlide(input: { target: $target, token: $token }) {
      succeeded
      message
    }
  }
`;
const unlikeMutation = gql`
  mutation follow($token: String!, $target: String!) {
    likeSlide(input: { target: $target, token: $token }) {
      succeeded
      message
    }
  }
`;

export const getHeroSliderSchema = () => {
  return {
    FollowMutation,
    unFollowMutation,
    likeMutation,
    unlikeMutation,
  };
};
