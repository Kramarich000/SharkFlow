const TaskFormInputs = ({ title, setTitle, description, setDescription, handleCreateTask }) => {
  return (
    <>
      <div className="relative">
        <input
          autoFocus
          value={title ?? ''}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleCreateTask();
          }}
          className="peer input-styles"
          placeholder=" "
          required
        />
        <label className="label-styles">Введите название задачи</label>
      </div>
      <div className="relative">
        <textarea
          value={description ?? ''}
          onChange={(e) => setDescription(e.target.value)}
          className="peer input-styles resize-none"
          placeholder=" "
          required
          rows={4}
        />
        <label className="label-styles">Введите описание задачи</label>
      </div>
    </>
  );
};

export default TaskFormInputs; 