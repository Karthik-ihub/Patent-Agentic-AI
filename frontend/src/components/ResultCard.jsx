function ResultCard({ title, content }) {
  return (
    <div style={{ border: "1px solid #ccc", borderRadius: 10, padding: 20, marginBottom: 20 }}>
      <h3>{title}</h3>
      <pre style={{ whiteSpace: "pre-wrap" }}>{content}</pre>
    </div>
  );
}
export default ResultCard;
