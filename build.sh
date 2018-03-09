FRONTEND_ROOT=$PWD/frontend/web
BACKEND_ROOT=$PWD/backend/web
PUBLIC_URL=./

cd $FRONTEND_ROOT
PUBLIC_URL=./ yarn build

if [ -d $BACKEND_ROOT/public/UI ]; then
    rm -rf $BACKEND_ROOT/public/UI
fi

mkdir $BACKEND_ROOT/public/UI
cp -r $FRONTEND_ROOT/build/* $BACKEND_ROOT/public/UI


