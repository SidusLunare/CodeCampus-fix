const PopularCourses = ({ courses }) => {
  if (!Array.isArray(courses)) {
    return (
      <section className='popular-courses-widget'>
        <h3>Populaire Cursussen</h3>
        <p>Geen cursusgegevens beschikbaar</p>
      </section>
    );
  }

  const topCourses = [...courses].sort((a, b) => b.views - a.views).slice(0, 3);

  return (
    <section className='popular-courses-widget'>
      <h3>Populaire Cursussen</h3>
      <ol className='popular-list'>
        {topCourses.map((course) => (
          <li key={course.id} className='popular-item'>
            <span className='popular-title'>{course.title}</span>
            <span className='popular-views'>{course.views} views</span>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default PopularCourses;
