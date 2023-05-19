/**
 * Email HTML body
 * Insert invisible space into domains from being turned into a hyperlink by email
 * clients like Outlook and Apple mail, as this is confusing because it seems
 * like they are supposed to click on it to sign in.
 *
 * @note We don't add the email address to avoid needing to escape it, if you do, remember to sanitize it!
 */
export function html(params: { url: string }) {
  const { url } = params;
  return `<!DOCTYPE html>
<html>
<head>
    <title>Login to Load.ai</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }

        .container {
            max-width: 600px;
            margin: auto;
        }

        .header {
            text-align: center;
            padding: 20px;
            background-color: #F8F8F8;
        }

        .main-content {
            padding: 30px;
            text-align: center;
        }

        .magic-link {
            padding: 15px 25px;
            background-color: black;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 25px;
            display: inline-block;
        }

        .footer {
            text-align: center;
            padding: 15px;
            background-color: #F8F8F8;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://load.conceptcodes.dev/logo.svg" alt="Logo" width="100">
        </div>

        <div class="main-content">
            <h2>Welcome Back!</h2>
            <p>We're glad to see you again. Just click the button below to log in. No password, no fuss!</p>
            <a href="${url}" class="magic-link">Log in with Magic Link</a>
            <p>This link will expire in 24 hours for security reasons.</p>
        </div>

        <div class="footer">
            <p>© ${new Date().getFullYear()} Load.ai. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
export function text({ url }: { url: string }) {
  return `Sign in to Load.ai\n${url}\n\n`;
}
