class MemesController < ApplicationController
  skip_before_action :verify_authenticity_token

  # index
  def index
    render json: Meme.all
  end

  #show
  def show
    render json: Meme.find(params["id"])
  end

  # create
  def create
    print params
    print "hello"
    render json: Meme.create(params["meme"])
  end

  # delete
  def delete
    render json: Meme.delete(params["id"])
  end

  #update
  def update
    render json: Meme.update(params["id"], params["meme"])
  end
end
