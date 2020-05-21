const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const label = core.getInput('label');
    const token = core.getInput('github-token');
    const title = core.getInput('title');
    const body = core.getInput('body');
    core.info(`Creating issue with label ${label}...`);

    const octokit = new github.GitHub(token);

    const opts = octokit.issues.listForRepo.endpoint.merge({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      labels: label,
      state: 'open',
    });

    const issues = await octokit.paginate(opts);
    if (issues == null || issues.length == 0) {
      const { data: issue } = await octokit.issues.create({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        labels: [label],
        title: title,
        body: body
      })
      core.info(`created new issue ${issue.number}`);
      core.debug(issue);

      core.setOutput('issue-number', issue.number);
      return;
    } else if (issues.length > 1) {
      throw `Too many ${label} issues created - expect 0 or 1`
    }
    core.info(`Found existing issue ${issues[0].number}`);
    core.debug(issues);
    core.setOutput('issue-number', issues[0].number);
  } catch(error) {
    core.setFailed(error.message);
  }
}

console.log('Starting...');
run();
