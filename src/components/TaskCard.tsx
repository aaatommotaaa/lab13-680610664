interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  isDone: boolean;
  deleteTaskFunc: (taskId: string) => void;
  toggleDoneTaskFunc: (taskId: string) => void;
}

export default function TaskCard({
  id,
  title,
  description,
  isDone,
  deleteTaskFunc,
  toggleDoneTaskFunc,
}: TaskCardProps) {
  const deleteBtnOnClick = () => {
    deleteTaskFunc(id);
  };

  const toggleDoneBtnOnClick = () => {
    toggleDoneTaskFunc(id);
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="row">
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-4">
            {/* แสดงเส้นขีดฆ่าเมื่อ isDone เป็น true */}
            <h5
              className={
                isDone
                  ? "text-decoration-line-through card-title"
                  : "card-title"
              }
            >
              {title}
            </h5>
          </div>
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-4">
            <p className="card-text">{description}</p>
          </div>
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-2">
            <button
              className="btn btn-success me-2"
              onClick={toggleDoneBtnOnClick}
            >
              Done
            </button>
          </div>
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-2">
            <button className="btn btn-danger" onClick={deleteBtnOnClick}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
