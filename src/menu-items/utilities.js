// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined,
  TransactionOutlined,
  BlockOutlined,
  AccountBookOutlined,
  MoneyCollectOutlined
} from '@ant-design/icons';

// icons
const icons = {
  FontSizeOutlined,
  BgColorsOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined,
  TransactionOutlined,
  BlockOutlined,
  AccountBookOutlined,
  MoneyCollectOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'util-transactions',
      title: 'Transactions',
      type: 'item',
      url: '/transactions',
      icon: icons.TransactionOutlined
    },
    {
      id: 'util-blocks',
      title: 'Blocks',
      type: 'item',
      url: '/blocks',
      icon: icons.BlockOutlined
    },
    {
      id: 'util-accounts',
      title: 'Accounts',
      type: 'item',
      url: '/accounts',
      icon: icons.AccountBookOutlined
    },
    {
      id: 'assets',
      title: 'Assets',
      type: 'item',
      url: '/assets',
      icon: icons.MoneyCollectOutlined,
      breadcrumbs: false
    },
    // {
    //   id: 'ant-asd',
    //   title: 'asd',
    //   type: 'item',
    //   url: '/icons/ant',
    //   icon: icons.AntDesignOutlined,
    //   breadcrumbs: false
    // }
  ]
};

export default utilities;
