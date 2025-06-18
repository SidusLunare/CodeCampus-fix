import { capitalize } from "../extra/functions";
import "../styles/CourseDetails.css";

export default function CourseDetails({ course, onClose }) {
  if (!course) return null;

  const courseCategories = course.categories;
  let detailsCategories = [];
  let capitalizedCategories;
  let capitalizeCategories;

  courseCategories.forEach((category) => {
    capitalizeCategories = capitalize(category);
    detailsCategories.push(capitalizeCategories);
  });

  if (capitalizeCategories.length >= 0) {
    capitalizedCategories = detailsCategories.join(", ");
  }

  return (
    <div className="course-details__overlay" onClick={onClose}>
      <div
        className="course-details__content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="course-details__content__close" onClick={onClose}>
          ×
        </button>

        <img
          className="course-details__content__image"
          src={course.imageUrl}
          alt={course.title}
        />

        <h2 className="course-details__content__title">{course.title}</h2>

        <p className="course-details__content__desc">{course.description}</p>

        <ul className="course-details__content__meta">
          <li>
            <strong>Level:</strong> {course.level}
          </li>
          <li>
            <strong>Duur:</strong> {course.duration}
          </li>
          <li>
            <strong>Docent:</strong> {course.instructor}
          </li>
          <li>
            <strong>Deelnemers:</strong> {course.members}
          </li>
          <li>
            <strong>Weergaven:</strong> {course.views}
          </li>
          <li>
            <strong>Rating:</strong> ⭐ {course.rating}
          </li>
          <li>
            <strong>Categorieën:</strong> {capitalizedCategories}.
          </li>
        </ul>

        <button
          className="course-details__content__watch"
          onClick={() => window.open(course.videoUrl, "_blank")}
        >
          Watch Video
        </button>
      </div>
    </div>
  );
}
