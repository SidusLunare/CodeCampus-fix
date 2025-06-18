import CourseCard from "./CourseCard";

const CourseList = ({
  courses,
  onSelectCourse,
  favoriteIds,
  onToggleFavorite,
}) => {
  if (!courses || courses.length === 0) {
    return <p className="empty-list">Geen cursussen gevonden.</p>;
  }

  return (
    <section className="course-list">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          onSelectCourse={onSelectCourse}
          isFavorite={favoriteIds.includes(course.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </section>
  );
};

export default CourseList;
