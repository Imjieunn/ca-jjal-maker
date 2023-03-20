const MainCard = ({ image, onHeartClick, alreadyFavorite }) => {
    const heartIcon = alreadyFavorite ? "💖" : "🤍";
    return (
        // console.log(props)
        <div className="main-card">
            <img src={image} alt='고양이' width="500" />
            <button onClick={onHeartClick}>{heartIcon}</button>
        </div>
    );
}

export default MainCard;