import mongoose from "mongoose";



//async await used becuase this action might take some time
const dbconnect = async () => {
  try {
    //db connect
    //mongoose.connect(process.env.dburl/dbname)
    const connectionInstance = await mongoose.connect(
      `${process.env.DATABASE_URI}/${process.env.DATABASE_NAME}`,
    );
    console.log(
      `\n MongoDb connected !!!! db_HOST : ${connectionInstance.connection.host}`
    );
    console.log(`Server is running on port ${process.env.PORT}`);
  } catch (error) {
    console.log("Error in Connection", error);
    process.exit(1);
  }
};
export default dbconnect;