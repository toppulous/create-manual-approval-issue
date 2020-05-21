# create-manual-approval-issue

![.github/workflows/integration.yml](https://github.com/toppulous/create-manual-approval-issue/workflows/.github/workflows/integration.yml/badge.svg)

This is one action in a series of actions - other actions and how to use them in tandem will be
detailed once they are created

This action will either create or find an issue to be used for manual approval in a CI/CD pipeline.

For each stage that required a manual approval, you should define a unique label in your repository (e.g. `dev-approval`). This action will then either create or find an issue with that label, and return the number for it.

## Inputs
### label
**Required** The label to attach to the issue, should be unique per stage, and should not be used
outside of the CI/CD flow

### title
*Optional* Title to assign to the issue. Default `[Github Actions] Manual Approval Required`

### body
*Optional* The body to assign to the issue. Default `Closing this issue will approve all changes
listed in the comments to the next stage`

### github-token
*Optional* The github token used to create an authenticated client, since repo and repo owner are
pulled from the context within the action, this value should **not** be populated.

## Outputs
### issue-number
The number of the issue created, or found if an open one already existed with the given label
