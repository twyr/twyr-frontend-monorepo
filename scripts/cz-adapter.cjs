#!/usr/bin/env node

const editor = require('editor');
const fs = require('node:fs');
const temp = require('temp').track();
const buildCommit = require('cz-customizable/lib/build-commit');
const log = require('cz-customizable/lib/logger');
const { getQuestions } = require('cz-customizable/lib/questions');

const config = require('../.cz-config.cjs');

const ticketNumberTypes = new Set(
	(config.ticketNumberTypes || []).map((type) => type.toLowerCase())
);

module.exports = {
	prompter(cz, commit) {
		config.subjectLimit = config.subjectLimit || 100;
		log.info(
			'All lines except first will be wrapped after 100 characters.'
		);

		const questions = getQuestions(config, cz).map((question) => {
			if (question.name !== 'ticketNumber') return question;

			return {
				...question,
				when(answers) {
					return ticketNumberTypes.has(
						(answers.type || '').toLowerCase()
					);
				}
			};
		});

		cz.prompt(questions).then((answers) => {
			if (answers.confirmCommit === 'edit') {
				temp.open(null, (error, info) => {
					if (error) return;

					fs.writeSync(info.fd, buildCommit(answers, config));
					fs.close(info.fd, () => {
						editor(info.path, (code) => {
							if (code === 0) {
								// eslint-disable-next-line security/detect-non-literal-fs-filename
								fs.readFile(
									info.path,
									{ encoding: 'utf8' },
									(readError, commitMessage) => {
										if (readError) return;

										commit(commitMessage);
									}
								);
								return;
							}

							log.info(
								`Editor returned non zero value. Commit message was:\n${buildCommit(answers, config)}`
							);
						});
					});
				});
			} else if (answers.confirmCommit === 'yes') {
				commit(buildCommit(answers, config));
			} else {
				log.info('Commit has been canceled.');
			}
		});
	}
};
