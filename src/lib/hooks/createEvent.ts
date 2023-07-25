import { CompleteEvent } from '@/schemas/Event';
import { google } from 'googleapis';
const { OAuth2 } = google.auth;
function createGoogleCalendarEvent(event: CompleteEvent) {
	const oauth2Client = new OAuth2(
		'739588439720-gqsslen6kp6e0c1q5mee1b08ndfkid50.apps.googleusercontent.com',
		'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',
		'http://localhost:3000' // Redirect URI
	);

	// generate a url that asks permissions for Google Calendar scopes
	const scopes = ['https://www.googleapis.com/auth/calendar.events'];

	const url = oauth2Client.generateAuthUrl({
		// 'online' (default) or 'offline' (gets refresh_token)
		access_type: 'offline',

		// If you only need one scope you can pass it as a string
		scope: scopes,
	});

	const { tokens } = await oauth2Client.getToken(code);
	oauth2Client.setCredentials(tokens);

	const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
}

export async function createEventHook(event: CompleteEvent) {}
