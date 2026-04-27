import "./HeroPreview.css";
import previewImage from "../assets/MainImage.png";

export default function HeroPreview() {
  return (
    <div className="hero-preview">
      <img
        src={previewImage}
        alt="Platform preview"
        className="hero-preview__image"
      />
    </div>
  );
}
