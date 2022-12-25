
const WeatherCard = ({ city, weather, iconSrc, timeSrc }) => (
    <div class="card shadow-lg rounded">
        <img src={timeSrc} class="time card-img-top" alt="img" />
        <div class="icon bg-light mx-auto text-center">
            <img src={iconSrc} alt="icon" />
        </div>
        <div class="text-muted text-uppercase text-center details">
            <h5 className="my-3">{city.EnglishName}, {city.Country.EnglishName}</h5>
            <div className="my-3">{weather.WeatherText}</div>
            <div className="display-4 my-4">
                <span>{weather.Temperature.Metric.Value}</span>
                <span>&deg;C</span>
            </div>
        </div>
    </div>
);

export default WeatherCard;
