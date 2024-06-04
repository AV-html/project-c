export const getErrorMessage = (error: Record<string, string>) => {
  const messages = Object.entries(error)
    .map(([val, key]) => `${key}: ${val}`)

  return (
    <div>
      {
        messages.map((msg, idx) => (
          <div key={idx}>
            {msg}
          </div>
        ))
      }
    </div>
  )
}
