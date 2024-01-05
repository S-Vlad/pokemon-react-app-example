import { Helmet } from 'react-helmet-async';

const PageMetaHeader: React.FC<Props> = ({ title, description, name = 'Vlad', type = 'website' }) => (
  <Helmet>
    <title>{title}</title>
    <meta name='description' content={description} />

    {/* Facebook tags */}
    <meta property='og:type' content={type} />
    <meta property='og:title' content={title} />
    <meta property='og:description' content={description} />

    {/* Twitter tags */}
    <meta name='twitter:creator' content={name} />
    <meta name='twitter:card' content={type} />
    <meta name='twitter:title' content={title} />
    <meta name='twitter:description' content={description} />
  </Helmet>
);

type Props = {
  title: string;
  description: string;
  name?: string;
  type?: string;
};

export default PageMetaHeader;
