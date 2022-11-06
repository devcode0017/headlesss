import { styled } from 'goober';

import { getPostsForCategory } from '../../../lib/api';

export default function Category({ category, posts }) {
  return (
    <div>
      <h1>category: {category}</h1>

      <PostsContainer>
        {(posts.length &&
          posts?.map(({ node }) => (
            <div key={node.slug}>
              {node.featuredImage && <img src={node.featuredImage.node.sourceUrl} width='100%' alt='' />}
              <h3>{node.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </div>
          ))) || <p>No posts found.</p>}
      </PostsContainer>
    </div>
  );
}

export const getServerSideProps = async ({ params }) => {
  const data = await getPostsForCategory(params.categorySlug);

  return {
    props: {
      posts: data.length ? data : [],
      category: params.categorySlug
    }
  };
};

const PostsContainer = styled('div')`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;

  gap: 20px;

  > div {
    flex-basis: 30%;
  }

  img {
    max-width: 300px;
    max-height: 300px;
    object-fit: cover;
  }
`;
