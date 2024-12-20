"use client"

import Link from "next/link";
import {FaEye, FaPen} from "react-icons/fa";
import {FaTrashCan} from "react-icons/fa6";
import DateUtil from "@/utils/dateUtil";

const Card = ({title, text}) => {
    return (
        <div className={`flex flex-wrap gap-2 justify-between items-center text-sm font-medium text-gray-500`}>
            <span className={`capitalize`}>{`${title}:`}</span>
            <span className={`font-bold text-gray-950 text-base`}>{text}</span>
        </div>
    );
}

const ActionsCard = ({href, handleDelete}) => {
    return (
        <div className={`flex flex-wrap gap-2 justify-between items-center text-sm font-medium text-gray-500 mt-2`}>
            <span>Actions:</span>
            <div className={`flex`}>
                <Link title={`Edit`} className={`edit-btn`} href={href}><FaPen/></Link>
                <button className={`ml-3 delete-btn`} title={`Delete`} onClick={handleDelete}><FaTrashCan/></button>
            </div>
        </div>
    )
}

export const CategoryCard = ({category, handleDelete}) => {
    return (
        <div className={`bg-gray-100 shadow rounded-lg p-4 mt-3`}>
            <Card title={`name`} text={category.name}/>
            <Card title={`created by`} text={category?.createdBy?.name}/>
            <Card title={`created at`} text={DateUtil.formatDate(category.createdAt)}/>
            <Card title={`updated by`} text={category?.updatedBy?.name}/>
            <Card title={`updated at`} text={DateUtil.formatDate(category.updatedAt)}/>
            <ActionsCard
                href={`/dashboard/admin/categories/edit/${category.id}`}
                handleDelete={() => handleDelete(category)}
            />
        </div>
    )
}

export const ItemCard = ({item, handleDelete}) => {
    return (
        <div className={`bg-gray-100 shadow rounded-lg p-4 mt-3`}>
            <Card title={`name`} text={item.name}/>
            <Card title={`brand`} text={item.brand}/>
            <Card title={`model`} text={item.model}/>
            <Card title={`SKU`} text={item.sku}/>
            <Card title={`quantity`} text={item.quantity}/>
            <Card title={`price`} text={item.price}/>
            <Card title={`category`} text={item.category?.name ? item.category.name : 'unknown'} />
            <div className={`flex flex-wrap gap-2 justify-between items-center text-sm font-medium text-gray-500 mt-2`}>
                <span>Actions:</span>
                <div className={`flex`}>
                    <Link title={`View`} className={`edit-btn`} href={`/dashboard/admin/items/${item.id}`}>
                        <FaEye />
                    </Link>
                    <Link title={`Edit`} className={`ml-3 edit-btn`} href={`/dashboard/admin/items/${item.id}/edit`}>
                        <FaPen/>
                    </Link>
                    <button className={`ml-3 delete-btn`} title={`Delete`} onClick={handleDelete}><FaTrashCan/></button>
                </div>
            </div>
        </div>
    )
}

export const UserItemCard = ({item}) => {
    return (
        <div className={`bg-gray-100 shadow rounded-lg p-4 mt-3`}>
            <Card title={`name`} text={item.name}/>
            <Card title={`brand`} text={item.brand}/>
            <Card title={`model`} text={item.model}/>
            <Card title={`quantity`} text={item.quantity}/>
            <Card title={`price`} text={item.price}/>
            <Card title={`category`} text={item.category?.name ? item.category.name : 'unknown'} />
        </div>
    )
}

export const UserCard = ({user, handleDelete}) => {
    return (
        <div className={`bg-gray-100 shadow rounded-lg p-4 mt-3`}>
            <Card title={`name`} text={user.name} />
            <Card title={`email`} text={user.email} />
            <Card title={`role`} text={user.role} />
            <Card title={`added at`} text={DateUtil.formatDate(user.createdAt)} />
            <Card title={`updated at`} text={DateUtil.formatDate(user.updatedAt)} />
            <ActionsCard
                href={`/dashboard/admin/users/edit/${user?.id}`}
                handleDelete={() => handleDelete(user)}
            />
        </div>
    )
}

export const SupplierCard = ({supplier, handleDelete}) => {
    return (
        <div className={`bg-gray-100 shadow rounded-lg p-4 mt-3`}>
            <Card title={`name`} text={supplier.name}/>
            <Card title={`phone`} text={supplier.phone}/>
            <Card title={`address`} text={supplier.address}/>
            <ActionsCard
                href={`/dashboard/admin/suppliers/edit/${supplier.id}`}
                handleDelete={() => handleDelete(supplier)}
            />
        </div>
    )
}

export const CustomerCard = ({customer, handleDelete}) => {
    return (
        <div className={`bg-gray-100 shadow rounded-lg p-4 mt-3`}>
            <Card title={`name`} text={customer.name}/>
            <Card title={`phone`} text={customer.phone}/>
            <Card title={`address`} text={customer.address}/>
            <div className={`flex flex-wrap gap-2 justify-between items-center text-sm font-medium text-gray-500 mt-2`}>
                <span>Actions:</span>
                <div className={`flex`}>
                    <Link title={`View`} className={`edit-btn`} href={`/dashboard/admin/customers/${customer.id}`}>
                        <FaEye/>
                    </Link>
                    <Link title={`Edit`} className={`ml-3 edit-btn`} href={`/dashboard/admin/customers/edit/${customer.id}`}>
                        <FaPen/>
                    </Link>
                    <button className={`ml-3 delete-btn`} title={`Delete`} onClick={handleDelete}><FaTrashCan/></button>
                </div>
            </div>
        </div>
    )
}