
const SearchForm = ({ city, setCity, handleSubmit }) => (
    <form className="change-location my-4 text-center text-muted" onSubmit={handleSubmit}>
        <label className="mb-3" for="city">Enter a location for weather information</label>
        <input className="form-control p-2 mb-3" type="text" name="city" value={city} onChange={(e) => setCity(e.target.value)} />
        <button type="submit">Search</button>
    </form>
);

export default SearchForm;
