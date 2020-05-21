const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const label = core.getInput('label');
    const token = core.getInput('github-token');
    const title = core.getInput('title');
    const body = core.getInput('body');
    console.log(`Creating issue with label ${label}...`);

    const octokit = new github.GitHub(token);

    const opts = octokit.issues.listForRepo.endpoint.merge({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      labels: label,
      state: 'open',
    });

    const issues = await octokit.paginate(opts);
    console.log('Found open issues with tag:');
    console.log(issues);
    if (issues == null || issues.length == 0) {
      const { data: issue } = await octokit.issues.create({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        labels: [label],
        title: title,
        body: body
      })
      console.log('created new issue:');
      console.log(issue);

      core.setOutput('id', issue.id);
      return;
    } else if (issues.length > 1) {
      throw `Too many ${label} issues created - expect 0 or 1`
    }

    return issues[0].number;
  } catch(error) {
    core.setFailed(error.message);
  }
}

run();
