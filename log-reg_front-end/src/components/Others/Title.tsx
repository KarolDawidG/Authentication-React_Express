interface TitleProps {
  props: string;
}


export const Title: React.FC<TitleProps> = (props) => {
  return (
    <div className="center-side">
      <h1 className="regist__title">{props.props}</h1>
    </div>
  );
};
