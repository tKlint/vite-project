interface IProps {
    path: string;
}

const NotFound: React.FC<IProps> = (props) => {
    const { path } = props;
    return (
        <div>
            <p>{path}</p>
            <h1>Page is not defind</h1>
        </div>
    );
};
export default NotFound;
