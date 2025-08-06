# Supabase Configuration Setup

## Important: Update config.js with your actual Supabase credentials

You need to replace the placeholder values in `config.js` with your actual Supabase project credentials.

## Configuration Files:

1. **`config.js`** - Main configuration file (update this)
2. **`.env`** - Environment variables template (for reference)

## Steps to configure:

### Option 1: Update config.js directly (Recommended for simple setup)

1. Open `config.js`
2. Replace the placeholder values in the configuration object:

```javascript
database1: {
    url: 'https://your-actual-project-1-id.supabase.co',
    anonKey: 'your-actual-database-1-anon-key',
    name: 'Database 1'
},
database2: {
    url: 'https://your-actual-project-2-id.supabase.co',
    anonKey: 'your-actual-database-2-anon-key',
    name: 'Database 2'
}
```

### Option 2: Use environment variables (Advanced setup)

1. Update the `.env` file with your actual values
2. Use a build tool like Webpack or Vite to inject environment variables
3. Call `setConfigFromEnv()` method with your environment variables

## How to get your Supabase credentials:

1. Go to your Supabase dashboard
2. Select your project
3. Go to Settings → API
4. Copy the "Project URL" and "anon/public" key

## Database Setup:

Make sure both your Supabase projects have:
- A table named `users` (or update the auth method if using different table)
- Email/password authentication enabled
- Row Level Security (RLS) configured appropriately

## Steps to update:

1. Open `config.js`
2. Find the configuration object with `database1`, `database2`, and `development`
3. Replace the placeholder URLs and keys with your actual Supabase credentials
4. Optionally, update the database names to match your project names

## Testing:

- Test on `1.upscalingmedia.live` - should connect to Database 1
- Test on `2.upscalingmedia.live` - should connect to Database 2
- Users from Database 1 should NOT be able to login on subdomain 2
- Users from Database 2 should NOT be able to login on subdomain 1

## Configuration Validation:

The system will automatically validate your configuration and show warnings if:
- URLs still contain placeholder values
- Keys are not properly set
- Required fields are missing

## Environment Variables Template:

Check the `.env` file for the complete list of environment variables you can set.
