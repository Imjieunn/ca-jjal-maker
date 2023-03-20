function CatItem(props) {
    return (
        <li>
            <img src={props.image} style={{ width: '150px' }} />
        </li>
    );
}

export default CatItem;