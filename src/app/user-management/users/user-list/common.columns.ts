import {TableColumn} from 'src/app/shared/components/table/table-column'

export const COMMON_COLUMNS: TableColumn[] = [
    {
        name: 'Name',
        dataKey: ['firstName', 'lastName'],
        position: 'left',
        isSortable: true
    },
    {
        name: 'Email',
        dataKey: ['email'],
        position: 'center',
        isSortable: true
    },
    {
        name: 'Mobile No',
        dataKey: ['mobileNo'],
        position: 'left',
        isSortable: true
    },
    {
        name: 'Role',
        dataKey: ['role'],
        position: 'left',
        isSortable: true
    },
    {
        name: 'Date of Birth',
        dataKey: ['dob'],
        position: 'left',
        isSortable: false
    },
];

// Define a type alias for COMMON_COLUMNS
export type CommonColumnsType = typeof COMMON_COLUMNS;