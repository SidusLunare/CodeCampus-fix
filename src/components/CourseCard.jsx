import "../styles/CourseCard.css";

const CourseCard = ({
  course,
  onSelectCourse,
  isFavorite,
  onToggleFavorite,
}) => {
  if (!course)
    return (
      <article className="course-card empty">
        Geen cursus informatie beschikbaar
      </article>
    );

  const openCourseVideo = (url) => {
    return () => {
      window.open(url, "_blank", "noopener,noreferrer");
    };
  };

  return (
    <article className="course-card">
      <section onClick={() => onSelectCourse && onSelectCourse(course)}>
        <figure className="course-image">
          <img src={course.imageUrl} alt={course.title} />
        </figure>
        <div className="course-content">
          <div className="course-content-title-wrapper">
            <h3>{course.title}</h3>
          </div>
          <p className="course-description">{course.description}</p>
          <dl className="course-details">
            <div>
              <dt className="visually-hidden">Niveau</dt>
              <dd className="level">Niveau: {course.level}</dd>
            </div>
            <div>
              <dt className="visually-hidden">Duur</dt>
              <dd className="duration">Duur: {course.duration}</dd>
            </div>
          </dl>
          <footer className="course-stats">
            <span className="members">{course.members} leden</span>
            <span className="views">{course.views} weergaven</span>
            <span className="rating">⭐ {course.rating}</span>
          </footer>
        </div>
      </section>
      <div
        className="course-favorites"
        style={{ cursor: "pointer" }}
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(course.id);
        }}
      >
        <p>{isFavorite ? "★" : "☆"}</p>
      </div>
      <div className="course-actions">
        <button
          className="course-button"
          onClick={openCourseVideo(course.videoUrl)}
        >
          Bekijk Video
        </button>
      </div>
    </article>
  );
};

export default CourseCard;
