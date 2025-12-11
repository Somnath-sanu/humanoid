export const getTtsKeys = () => {
  const project_id = process.env.GOOGLE_PROJECT_ID!
  const private_key = process.env.GOOGLE_PRIVATE_KEY!
  const client_email = process.env.GOOGLE_CLIENT_EMAIL!

  return {
    project_id,
    private_key,
    client_email,
  }
}
