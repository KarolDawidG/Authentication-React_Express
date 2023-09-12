interface TitleProps {
  props: string;
}

export const Title: React.FC<TitleProps> = (props) => {
  return (
    <div className="title">
      <h1>{props.props}</h1>
    </div>
  );
};
