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
			src="https://unpkg.com/saasbox-bug-reporter@1.0.3/dist/bug-reporter.min.js"
			strategy="afterInteractive"
			onLoad={() => {
				if (typeof window !== 'undefined' && window.BugReporter) {
					window.BugReporter.init({
						apiEndpoint: 'https://saasbox.app/api/bug-reporter',
						saasBoxKey: 'demo-saasbox-key-123',
						saasBoxSecret: 'demo-saasbox-secret-456',
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

