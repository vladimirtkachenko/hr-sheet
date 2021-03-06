import { EViewPriority } from '../../google/interfaces/EPriority';
import EmployeeInterface from '../../interfaces/EmployeeInterface';

function isBenchAccount(accountName: string): boolean {
  return accountName === 'Corporate Delivery Bench';
}

function isInternalAccount(accountName: string): boolean {
  const internalAccounts = [
    'Tools',
    'TA Offshore',
    'TA Onsite',
    'Sales Management',
    'R&D General',
    'Pre-Sales',
    'Office',
    'Marketing',
    'Internship',
    'IT',
    'GridDynamics',
    'Engineering Management',
    'Delivery Management',
    'GridU Trainings',
  ];

  return internalAccounts.includes(accountName);
}
// function isExternalAccount(accountName: string) {
//   return !isBenchAccount(accountName) && !isInternalAccount(accountName);
// }

function getPriority(projects: string[]): EmployeeInterface['priority'] {
  let currentPriority: EViewPriority = EViewPriority.Bench;
  // projectFullName format: '<accountName>/<projectname>'
  projects.forEach((projectFullName: string) => {
    let accountPriority: EViewPriority = EViewPriority.CustomerProject;
    const accountName = projectFullName.replace(/\/.*$/, '');

    if (isBenchAccount(accountName)) {
      accountPriority = EViewPriority.Bench;
    } else if (isInternalAccount(accountName)) {
      accountPriority = EViewPriority.InternalProject;
    }

    if (currentPriority < accountPriority) {
      currentPriority = accountPriority;
    }
  });
  return currentPriority;
}

export default getPriority;
