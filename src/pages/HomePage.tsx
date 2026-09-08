import { Link } from "react-router";
import "../styles.css";

export default function HomePage() {
  return (
    <div className="container py-5 font">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-5">
          <div
            className="card border-0 shadow-sm p-4 text-center"
            style={{ backgroundColor: "#fff5f7", borderRadius: "24px" }}
          >
            <div className="card-body">
              <h2 className="fw-bold text-dark mb-2">Home</h2>
              <p className="text-muted mb-4">
                หน้าแรก — เลือกไปยังหน้าอื่น ๆ ได้จากที่นี่
              </p>

              <div className="d-flex flex-column align-items-center gap-2 mt-4">
                <Link
                  className="btn text-white fw-bold px-4 py-2 shadow-sm"
                  to="/my/todolistpage"
                  style={{ backgroundColor: "#9bb8ed", borderRadius: "20px" }}
                >
                  ไปหน้า Todo List
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
