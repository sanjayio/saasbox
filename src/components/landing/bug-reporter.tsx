'use client';

import Script from 'next/script';

declare global {
	interface Window {
		BugReporter?: {
			init: (config: {
				apiEndpoint: string;
				saasBoxKey: string;
				saasBoxSecret: string;
				screenshotMode?: string;
				position?: string;
				offsetX?: number;
				offsetY?: number;
				buttonSize?: number;
				buttonShape?: string;
				buttonIcon?: string;
				buttonColor?: string;
				buttonShadow?: string;
				modalTitle?: string;
				modalHeaderColor?: string;
				modalHeaderTextColor?: string;
				modalPrimaryColor?: string;
				modalDescriptionLabel?: string;
				modalDescriptionPlaceholder?: string;
				modalSubmitText?: string;
				modalCancelText?: string;
			}) => void;
		};
	}
}

export function BugReporter() {
	return (
		<Script
			src="https://unpkg.com/saasbox-bug-reporter@1.0.7/dist/bug-reporter.min.js"
			strategy="afterInteractive"
			onLoad={() => {
				if (typeof window !== 'undefined' && window.BugReporter) {
					window.BugReporter.init({
						apiEndpoint: `${process.env.BETTER_AUTH_URL}/api/bug-reports`,
						saasBoxKey: 'sbx-key-e64b7b6403d744859ea78276ec46e422',
						saasBoxSecret: 'sbx-secret-1187047c48d4409fbba532998b3ce26b',
						screenshotMode: 'selection',
						position: 'bottom-left',
						offsetX: 30,
						offsetY: 30,
						buttonSize: 55,
						buttonShape: 'rounded',
						buttonIcon: '🐛',
						buttonColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
						buttonShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
						modalTitle: 'Report a Bug',
						modalHeaderColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
						modalHeaderTextColor: '#ffffff',
						modalPrimaryColor: '#667eea',
						modalDescriptionLabel: 'Describe the issue',
						modalDescriptionPlaceholder: 'Please tell us what went wrong...',
						modalSubmitText: 'Submit',
						modalCancelText: 'Cancel',
					});
				}
			}}
		/>
	);
}

