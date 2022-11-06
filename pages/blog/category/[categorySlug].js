import { getPostsForCategory } from '../../../lib/api';

export default function Category({ category, posts }) {
  return (
    <div>
      <h1>{category}</h1>

      {(posts.length &&
        posts?.map(({ node }) => (
          <div key={node.slug}>
            <h3>{node.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          </div>
        ))) || <p>No posts found.</p>}
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
