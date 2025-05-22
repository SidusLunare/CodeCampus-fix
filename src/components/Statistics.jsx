const Statistics = ({ courses }) => {
  const isValidData = Array.isArray(courses) && courses.length > 0;

  const getTotalMembers = () => {
    if (!isValidData) return 0;
    return courses.reduce((total, course) => total + course.members, 0);
  };

  const getTotalViews = () => {
    if (!isValidData) return 0;
    return courses.reduce((total, course) => total + course.views, 0);
  };

  const getAverageRating = () => {
    let avg;
    if (courses.length >= 1) {
          avg =
      courses.reduce((total, course) => total + course.rating, 0) /
      courses.length;
    return avg.toFixed(1);
    } if (courses.length == null || courses.length == 0) {
      return "-";
    }

  };

  return (
    <section className='statistics-widget'>
      <h3>Statistieken</h3>
      <dl className='stats-container'>
        <div className='stat-item'>
          <dt className='stat-label'>Totaal Leden</dt>
          <dd className='stat-value'>{getTotalMembers()}</dd>
        </div>
        <div className='stat-item'>
          <dt className='stat-label'>Totaal Weergaven</dt>
          <dd className='stat-value'>{getTotalViews()}</dd>
        </div>
        <div className='stat-item'>
          <dt className='stat-label'>Gemiddelde Beoordeling</dt>
          <dd className='stat-value'>⭐ {getAverageRating()}</dd>
        </div>
      </dl>
    </section>
  );
};

export default Statistics;
